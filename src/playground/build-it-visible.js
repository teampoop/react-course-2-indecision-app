console.log('Build It 1');

class Visibility extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false
    };
  }
  handleToggleVisibility() {
    this.setState((prev) => {
      return {
        visibility: !prev.visibility
      };
    });
  }
  render() {
    return (
      <div >
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? "Hide Details" : "Show Details"}
        </button>
        {this.state.visibility && <p>Hey. These are some details you can now see</p> }
    </div >
    );
  }
}
ReactDOM.render(<Visibility />, document.getElementById('app'));
