import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [], error: undefined }));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const selectedOption = this.state.options[randomNum];
    this.setState(() => ({selectedOption}));
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    }
    else if (this.state.options.indexOf(option) > -1) {
      return 'This option is already added';
    }
    this.setState((prev) => ({ options: prev.options.concat(option) }));
  };
  handleClearSelectedOption = () => {
    this.setState(() => ({selectedOption: undefined}));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options: options }));
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
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>

        <OptionModal
          handleClearSelectedOption={this.handleClearSelectedOption}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}