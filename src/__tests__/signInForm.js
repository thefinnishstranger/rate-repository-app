import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import SignInForm from "../components/SignInForm"; // Adjust the path as needed

describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const onSubmit = jest.fn();
        render(<SignInForm onSubmit={onSubmit} />);

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'nik');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'nikolas');
        fireEvent.press(screen.getByText('Log in'));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: 'nik',
                password: 'nikolas'
            });
        });
    });
});
