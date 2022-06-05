import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { resolve, join } from 'path'

async function getFiles (dir: string): Promise<string[]> {
  const filesFromFolder = readdirSync(dir, { withFileTypes: true })
  const files = await Promise.all(filesFromFolder.map((dirent) => {
    const res = resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  }))
  return Array.prototype.concat(...files)
}

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  getFiles(join(__dirname, '/../routes'))
    .then(files => {
      files.map(async filePath => {
        if (!filePath.includes('.test.')) {
          (await import(filePath)).default(router)
        }
      })
    })
    .catch(error => console.log(error))
}
