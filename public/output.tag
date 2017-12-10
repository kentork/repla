<output>
  <section>
    <pre>{ text }</pre>
  </section>

  <script>
    this.text = ""

    opts.observer.on('result', text => {
      this.text = text
      this.update()
    })

  </script>

  <style scoped>
    pre {
      height: 100%;
      font-family: "Helvetica Neue", "Yu Gothic";
      padding: 6px 43px;
    }
  </style>
</output>