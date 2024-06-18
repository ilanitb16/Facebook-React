
const net = require('net');
const MongoClient = require('mongodb').MongoClient;

module.exports.mongo = (user, pass) => {
    const MONGODB_CONNECTION = `mongodb+srv://${user}:${pass}@cluster0.cs944.gcp.mongodb.net/?retryWrites=true&w=majority`
    console.log("CONNECTION:", MONGODB_CONNECTION)
    return new MongoClient(MONGODB_CONNECTION).db("barilan");
}

module.exports.generateGuid = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for ( let i = 0; i < 9; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

module.exports.ok = (response, result) => {
	console.log(result);

    if(result.error){
		response.status(500).send(result.result);
    }
    else{
		response.type('application/json');
        response.status(result.status).send(result.result);
    }
}

module.exports.checkLinks = (text) => {
	return new Promise(async (resolve, reject) => {
		let links = [];

		try{
			links = extractLinks(text);
			console.log("LINKS:", links);

			for(let i = 0; i < links.length; i++){
				
				let link = links[i];
				let answer = await checkLink(link);

				if(answer == "FORBIDDEN"){
					reject({status: 403, error: `Link is not allowed: '${link}'`, links: links})
					return;
				}
				
			}

			resolve({status: 200, links: links})
		}
		catch(ex){
			console.log(ex);
			let error = "Unable to check the link. Probaly the server can be unavailable or error occured. Try again later.";
			reject({status: 500, error: error, links: links})
			return;
		}
	});
}

let extractLinks = (text) => {
	var urlRegex = /(https?:\/\/[^ ]*)/igm;
	var links = [...text.matchAll(urlRegex)];
	return links.map(link => link[0]);
}

let checkLink = async (url) => {
	let remoteAddress = process.env.LINK_CHECKER_ADDRESS;
	let remotePort = process.env.LINK_CHECKER_PORT;
	// remotePort = 5555;
	// remoteAddress = '192.168.81.131'; // Replace 'remote_server_ip' with the IP address of the remote server
	
	console.log(`ADDRESS: ${remoteAddress}, PORT: ${remotePort}, URL: '${url}'`);

    return new Promise((resolve, reject) => {
        // Create a new TCP client socket
        const client = new net.Socket();

        // Connect to the remote server
        client.connect(remotePort, remoteAddress, () => {
            console.log('Connected to remote server');
            
            // Once connected, you can send data
            // client.write('https://google.com');
            // client.write('https://facebook.com');
            client.write(url);
        });

        // Handle incoming data from the server
        client.on('data', (data) => {
            console.log('Received data from server:', data.toString());
            resolve(data);
        });

        // Handle connection close
        client.on('close', () => {
            console.log('Connection to server closed');
            resolve();
        });

        // Handle connection errors
        client.on('error', (err) => {
            console.error('Error connecting to server:', err);
            reject(err);
        });
    });
}