import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button', () => {
  it('renders the label and reacts to clicks', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
    await userEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
