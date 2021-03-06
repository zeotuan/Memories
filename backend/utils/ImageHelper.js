import photoChunk from '../models/photoChunks.js';
import photoFiles from '../models/photoFiles.js';

export const recreateImageFromPart = (chunks, contentType) => {
    let fileData = [];
    if(!chunks || chunks.length === 0){
        return null;
    }
    for(let i = 0; i < chunks.length; i++ ){
        fileData.push(chunks[i].data.toString('base64'));
    }
    const imageFile = "data:" + contentType + ";base64," + fileData.join("").trim();
    return imageFile;
}



export const getImageFromPhotoFiles = async (files) => {
    try{
        if(!files){
            return null;
        } 
        const chunks = await photoChunk
            .find(
                {files_id: 
                    { $in: files.map(f => f._id)}
                }
            )
            .sort({files_id:1, n:1});
        //return a dictionary containing file data and the recreated image
       
        let ImageResult = {}; 
        files.forEach(f => ImageResult[f._id] = {file: f, image:undefined});
        let curId = null;
        let tempParts = [];
        // chunks.forEach(chunk => {
        //     if(!curId || curId !== chunk.files_id){
        //         if(curId){
        //             const contentType = ImageResult[curId].file.contentType;
        //             ImageResult[curId].image = recreateImageFromPart(tempParts, contentType);
        //         }
        //         curId = chunk.files_id;
        //         tempParts = [];
        //     }
        //     tempParts.push(chunk);
        // })
        let i = 0;
        while(i <= chunks.length){
	        if(!curId || i === chunks.length ||curId !== chunks[i].files_id){
	            if(curId){
                   const contentType = ImageResult[curId].file.contentType;
                    ImageResult[curId].image = recreateImageFromPart(tempParts, contentType);
                }
		       if(i < chunks.length){
			        curId = chunks[i].files_id;
                    tempParts = [];
		        }        
	        }
	        if(i < chunks.length) tempParts.push(chunks[i]);
	        i++ ;
        }
        return ImageResult;
    }catch(error){
        console.log("failed at getImageFromphotofiles");
        throw new Error(error.message);
    }
}

export const getImages = async (ids) => {
    try {
        const files = await photoFiles.find({_id:{$in:ids}});
        const imageDic = getImageFromPhotoFiles(files);
        return imageDic;
    } catch (error) {
        console.log("failed at getImages");
        throw new Error(error.message);
    }
}

export const deleteImage = async (id) => {
    if(id){
       try{
            await photoFiles.findByIdAndDelete(id);
            await photoChunk.deleteMany({files_id:id});
        }catch(error){
            console.log(error);
        } 
    }
}