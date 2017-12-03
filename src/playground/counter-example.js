class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      localStorage.setItem('count', this.state.count);
    }
  }
  componentDidMount() {
    const count = parseInt(localStorage.getItem('count'), 10);
    if (!isNaN(count)) {
      this.setState(() => ({count}));
    }
  }
  handleAddOne() {
    this.setState((prevState) => ({count: prevState.count + 1}));
  }
  handleMinusOne() {
    this.setState((prevState) => ({count: prevState.count -1}));
  }
  handleReset() {
    this.setState((prev) => ({count: 0}));
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button className="button" onClick={this.handleAddOne}>+1</button>
        <button className="button" onClick={this.handleMinusOne}>-1</button>
        <button className="button" onClick={this.handleReset}>reset</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
