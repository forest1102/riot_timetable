<md>
    <script>
        import marked from 'marked'
        this.on('mount', () => {
            console.log('arrow!!');
        })
        this.root.innerHTML = opts.content
            ? marked(opts.content)
            : ''
    </script>

    <style>
        :scope {
            display: block;
        }

    </style>
</md>