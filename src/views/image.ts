import Image from '../model/Image'

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path.split(' ').join('%20')}`
    }
  },
  renderMany(image: Image[]) {
    return image.map(image => this.render(image))
  }
}