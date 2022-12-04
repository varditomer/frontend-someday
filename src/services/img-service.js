import { storageService } from './storage-service'

const IMGS_KEY = 'img_db'

export const imgService = {
    getImgs,
    saveImg,
}

function getImgs() {
    return storageService.load(IMGS_KEY)
}

function saveImg(img) {
    let imgs = storageService.load(IMGS_KEY)
    imgs.push(img)
    return storageService.save(IMGS_KEY, imgs)
}
