const Client = require('ssh2-sftp-client');
const sftp = new Client();

const config = {
	host: "192.168.127.128",
	port: 22,
	username: "teddy",
	password: "root2"
};

async function run(){
	try {
		await sftp.connect(config);
		console.log("Connected to SFTP server");
		
		const fileList = await sftp.list('/home/teddy/uploads');
		console.log("File in /uploads: ", fileList);

		await sftp.put('example2.txt', '/home/teddy/uploads/remote-file.txt');
		console.log("File uploaded");

		await sftp.get('/home/teddy/uploads/remote-file.txt', 'downloaded-file.txt');
		console.log("File downloaded");

	} catch (err) {
		console.log("Error: ", err);
	} finally {
		await sftp.end();
	}
}

run();