<selector>
  <section>
    <div class="select">
      <select onchange={ changeRepl }>
        <option each={ repl in repls } value={ repl.id } selected={ selected == repl.id }>
          { repl.name }
        </option>
      </select>
    </div>

    <a class={ button: true, `is-primary`: true, `is-loading`: loading } click={ run }>
      <span class="icon">
        <i class="fa fa-terminal"></i>
      </span>
      <span>Run</span>
    </a>
  </section>

  <script>
    this.repls = []
    this.loading = false


    opts.observer.on('result', text => {
      this.loading = false
      this.update()
    })

    fetch('/api/repls')
      .then(response =>  response.text())
      .then(body => {
        this.repls = JSON.parse(body)
        opts.observer.trigger('change-repl', this.repls[0])
        this.update()
      });

    changeRepl(e) {
      const repl = e.target.value
      const replObject = this.repls.find(l => l.id === repl )

      opts.observer.trigger('change-repl', replObject)
    }

    run(e) {
      opts.observer.trigger('run')
      this.loading = true
      this.update()
    }
  </script>

  <style scoped>
    selector {
      display: flex;
      justify-content: space-between;
    }
  </style>
</selector>