<script>
  import FilePond from 'svelte-filepond';
  import 'filepond/dist/filepond.css';
  let {response = $bindable()} = $props();
</script>

<FilePond
  name="gambar"
  allowMultiple={false}
  server={{
    process: {
      url: '/api/hit-plant',
      method: 'POST',
      // @ts-ignore
      onload: (res) => {
        response = res;
      },
    },
  }}
/>