
const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </header>
  );
}
Header.defaultProps = {
  title: 'Indecision',
};

const Action = (props) => {
  return (
      <div>
        <button onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
      </div>
  );
}

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove all</button>
      {props.options.length === 0 && <p>Add an option to get started</p>}
      <ol>
        {props.options.map((option, i) => (
          <Option
            key={i}
            value={option}
            handleDeleteOption={props.handleDeleteOption}
          />))}
      </ol>
    </div>
  );
}

const Option = (props) => (
  <li>
    {props.value}
    <button
      onClick={(e) => props.handleDeleteOption(props.value)}
    >Remove</button>
  </li>
);

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined,
    }
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));
    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

class IndecisionApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: props.options
    };
  }
  handleDeleteOptions() {
    this.setState(() => ({options: [], error: undefined}));
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    console.log(option);
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    }
    else if (this.state.options.indexOf(option) > -1) {
      return 'This option is already added';
    }

    this.setState((prev) => ({ options: prev.options.concat(option)}));
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({options: options}));
      }
    }
    catch (e) {
      // Do Nothing.
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  render() {
    return (
      <div>
        <Header
          title={this.state.title}
          subtitle={this.state.subtitle}
        />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}
IndecisionApp.defaultProps = {
  options: []
};

const User = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
