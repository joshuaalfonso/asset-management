import PocketBase from 'pocketbase';


const url = 'https://asset.pockethost.io/'
const client = new PocketBase(url)

export {url, client};