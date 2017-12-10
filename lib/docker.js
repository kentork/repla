const Docker = require('dockerode')
const docker = new Docker({ socketPath: '/var/run/docker.sock' })

const repl = require('./repl')

module.exports.run = async (id, code) => {
  const define = await repl.getRepl(id)

  const image = define.container.image
  const command = define.container.command.replace('<<code>>', code)

  console.log(command)

  return new Promise((resolve, reject) => {
    var output = ''

    docker.createContainer(
      {
        Image: image,
        Cmd: ['sh', '-c', command]
      },
      (err, container) => {
        console.log(`Created a container : ${container.id}`)
        container.start((err, data) => {
          if (err) {
            reject(err)
            return
          }
          console.log(`Started it : ${container.id}`)

          var logStream = new require('stream').PassThrough()
          logStream.on('data', chunk => (output += chunk.toString('utf8')))
          logStream.on('end', chunk => resolve(output))

          container.logs({ follow: true, stdout: true, stderr: true }, (err, stream) => {
            if (err) {
              reject(err)
            }
            container.modem.demuxStream(stream, logStream, logStream)

            stream.on('end', () => {
              logStream.end('')

              container.stop((err, data) => {
                console.log(`Stopped it : ${container.id}`)
                container.remove((err, data) => {
                  console.log(`Removed : ${container.id}`)
                })
              })
            })

            setTimeout(() => stream.destroy(), 2000)
          })
        })
      }
    )
  })
}
