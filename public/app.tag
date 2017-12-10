<app>

  <selector observer={observer} />
  <editor observer={observer} />
  <output observer={observer} />

  <script>
    this.observer = riot.observable()
  </script>

  <style scoped>
    app {
      display: grid;
      grid-template-rows: 50px 2fr 1fr;
      height: 100%;
    }
    selector {
      display: grid;
      margin: 10px 25px;
    }
    editor {
      display: grid;
      height: 100%;
    }
    output {
      display: grid;
      height: 100%;
    }
  </style>
</app>