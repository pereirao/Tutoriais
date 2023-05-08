const fileInput = document.getElementById("file-input");
const uploadButton = document.getElementById("upload-button");
const outputDiv = document.getElementById("output-div");

uploadButton.addEventListener("click", () => {
    const fr = new FileReader();
    const file = fileInput.files[0];
    fr.onload = async (e) => {
        console.log("Read successfully");

        const CHUNK_SIZE = 8192;
        const fileSize = e.target.result.byteLength;
        const chunkCount = Math.round(fileSize / CHUNK_SIZE, 0);
        const fileName = Date.now().toString() + "_" + file.name;

        for (let chunkId = 0; chunkId <= chunkCount; chunkId++) {
            const chunk = e.target.result.slice(chunkId * CHUNK_SIZE, chunkId * CHUNK_SIZE + CHUNK_SIZE);
            await fetch("http://localhost:8080/upload", {
                "method": "POST",
                "headers": {
                    "content-type": "application/octet-stream",
                    "content-length": chunk.length,
                    "file-name": fileName
                },
                "body": chunk
            });
            outputDiv.textContent = `${Math.round(chunkId * 100 / chunkCount, 0)}%`;
        }
        console.log(`Uploaded ${fileSize} bytes`);
    };
    fr.readAsArrayBuffer(file);
});
