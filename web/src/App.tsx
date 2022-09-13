// JSX: Javascript + XML (HTML)

interface ButtonProps{
  title: string;
}
function Button(props: ButtonProps) {
  return (
   <button> {props.title} </button>
  )
  }
  

function App() {
  return (
  <div>
  <Button title="B1"/>
  <Button title="B2"/>
  <Button title="B3"/>
  </div>
  )
}
export default App
