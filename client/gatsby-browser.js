const addScript = url => {
    const script = document.createElement("script")
    script.src = url
    script.async = true
    document.body.appendChild(script)
  }
  
  export const onClientEntry = () => {
    window.onload = () => {
      addScript("https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js")
    }
  }