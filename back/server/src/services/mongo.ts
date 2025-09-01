import mongoose from 'mongoose';

mongoose.connection.once('open', () => {
  console.log('MongoDB ready!')
})
mongoose.connection.on('error', err => {
  console.error(err)
})

export async function mongoConnect() {
  await mongoose.connect('mongodb://localhost:27017/portfolio')
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}