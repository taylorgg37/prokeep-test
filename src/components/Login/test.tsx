import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Login } from '.'

describe('<Login />', () => {
  it('The form should be visible', () => {
    const { container } = render(<Login />)

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
  it('Submit the form with a fake email address and password', async () => {
    const { container } = render(<Login />)
    const user = userEvent.setup()
    const emailInput = container.querySelector('#email')
    const PasswordInput = container.querySelector('#password')
    const SubmitBtn = container.querySelector('#submit-btn')
    if (emailInput) {
      await user.type(emailInput, 'test@mail.com')
    }

    if (PasswordInput) {
      await user.type(PasswordInput, 'password123')
    }

    if (SubmitBtn) {
      await user.click(SubmitBtn)
    }
  })
  it('Submit the form with an empty email address and password', async () => {
    const { container } = render(<Login />)
    const user = userEvent.setup()
    const SubmitBtn = container.querySelector('#submit-btn')
    expect(SubmitBtn).toBeVisible()

    await user.click(SubmitBtn as Element)
    expect(screen.getByText('Enter your email.')).toBeVisible()
    expect(screen.getByText('Enter your password.')).toBeVisible()
  })
})
