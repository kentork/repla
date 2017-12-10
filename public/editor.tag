<editor>
  <section></section>

  <script>
    const self = this

    this.repl = ""

    opts.observer.on('change-repl', repl => {
      this.repl = repl.id

      let editor = ace.edit(self.root.querySelector('section'))
      editor.setTheme('ace/theme/tomorrow_night_blue')
      editor.setFontSize("14px")
      editor.session.setUseWorker(false)

      let doc = editor.getSession()
      doc.setMode(`ace/mode/${repl.aceCode}`)

      fetch(`/api/repls/${repl.id}/template`)
        .then(response => response.text())
        .then(body => {
          doc.setValue(body)
        })
    })

    opts.observer.on('run', () => {
      let editor = ace.edit(self.root.querySelector('section'))
      let doc = editor.getSession()

      fetch(`/api/run/${this.repl}`,{
        method: "POST",
        body: `${escapeForPost(doc.getValue())}`
      })
        .then(response => response.text())
        .then(text => {
          opts.observer.trigger('result', text)
        })
    })

    escapeForPost = code => code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

  </script>

  <style scoped>
  </style>
</editor>