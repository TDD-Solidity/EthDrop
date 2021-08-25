import React from 'react';

type Props = {
  toggleMenu: any
};

type State = {
  hamburgerActive: boolean
};

class Hamburger extends React.Component<Props> {
  constructor(public props: Props) {
    super(props);
    this.state = {
      hamburgerActive: false
    };
  }

  handleToggle = () => {
    this.setState( (prevState: State) => ({
      hamburgerActive: !prevState.hamburgerActive
    }));
    (this.props as any).toggleMenu((this.state as any).hamburgerActive);
  };

  render() {
    return (
      <button
        id="toggle-main-menu-mobile"
        className={`hamburger hamburger--slider ${
          (this.state as any).hamburgerActive ? 'is-active' : ''
        }`}
        type="button"
        onClick={this.handleToggle}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
    );
  }
}

export default Hamburger;
