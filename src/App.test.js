import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const AllTheProviders = ({ children }) => {
  return (
    <HelmetProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {children}
      </BrowserRouter>
    </HelmetProvider>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = renderWithProviders(<App />);
    expect(container).toBeTruthy();
  });

  test('app container exists', () => {
    renderWithProviders(<App />);
    expect(document.querySelector('.App')).toBeInTheDocument();
  });

  test('renders main content wrapper', () => {
    renderWithProviders(<App />);
    expect(document.querySelector('.main-content')).toBeInTheDocument();
  });
});

export { renderWithProviders };