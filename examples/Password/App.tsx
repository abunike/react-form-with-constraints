import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints';
import { DisplayFields } from 'react-form-with-constraints-tools';

import './index.html';
import './style.css';

interface Props {}

interface State {
  username: string;
  password: string;
  passwordConfirm: string;
  submitButtonDisabled: boolean;
}

class Form extends React.Component<Props, State> {
  form: FormWithConstraints;
  password: HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      submitButtonDisabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.currentTarget;

    this.setState({
      [target.name as any]: target.value
    });

    await this.form.validateFields(target);
    this.setState({submitButtonDisabled: !this.form.isValid()});
  }

  async handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.currentTarget;

    this.setState({
      [target.name as any]: target.value
    });

    await this.form.validateFields(target, 'passwordConfirm');
    this.setState({submitButtonDisabled: !this.form.isValid()});
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fieldFeedbackValidations = await this.form.validateFields();
    const formIsValid = fieldFeedbackValidations.every(fieldFeedback => fieldFeedback.isValid!);
    this.setState({submitButtonDisabled: !formIsValid});
    if (formIsValid) {
      alert(`Valid form\n\nthis.state =\n${JSON.stringify(this.state, null, 2)}`);
    }
  }

  render() {
    return (
      <FormWithConstraints ref={formWithConstraints => this.form = formWithConstraints!}
                           onSubmit={this.handleSubmit} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <input type="email" name="username" id="username"
                 value={this.state.username} onChange={this.handleChange}
                 required minLength={3} />
          <FieldFeedbacks for="username">
            <FieldFeedback when="tooShort">Too short</FieldFeedback>
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"
                 ref={password => this.password = password!}
                 value={this.state.password} onChange={this.handlePasswordChange}
                 required pattern=".{5,}" />
          <FieldFeedbacks for="password" stop="first-error">
            <FieldFeedback when="valueMissing" />
            <FieldFeedback when="patternMismatch">Should be at least 5 characters long</FieldFeedback>
            <FieldFeedback when={value => !/\d/.test(value)} warning>Should contain numbers</FieldFeedback>
            <FieldFeedback when={value => !/[a-z]/.test(value)} warning>Should contain small letters</FieldFeedback>
            <FieldFeedback when={value => !/[A-Z]/.test(value)} warning>Should contain capital letters</FieldFeedback>
            <FieldFeedback when={value => !/\W/.test(value)} warning>Should contain special characters</FieldFeedback>
          </FieldFeedbacks>
        </div>

        <div>
          <label htmlFor="password-confirm">Confirm Password</label>
          <input type="password" name="passwordConfirm" id="password-confirm"
                 value={this.state.passwordConfirm} onChange={this.handleChange} />
          <FieldFeedbacks for="passwordConfirm">
            <FieldFeedback when={value => value !== this.password.value}>Not the same password</FieldFeedback>
          </FieldFeedbacks>
        </div>

        <button disabled={this.state.submitButtonDisabled}>Sign Up</button>

        <DisplayFields />
      </FormWithConstraints>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById('app'));
