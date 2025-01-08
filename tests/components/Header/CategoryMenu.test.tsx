import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryMenu from 'components/Header/CategoryMenu';

describe('CategoryMenu Component', () => {
  const mockCategories = ['Category 1', 'Category 2', 'Category 3'];
  const mockOnCategoryClick = jest.fn();
  const mockOnRandomJokeClick = jest.fn();

  const setup = () => {
    render(
      <CategoryMenu
        categories={mockCategories}
        onCategoryClick={mockOnCategoryClick}
        onRandomJokeClick={mockOnRandomJokeClick}
      />,
    );
  };

  it('renders the trigger button', () => {
    setup();
    const triggerButton = screen.getByRole('button', {
      name: /find jokes by category/i,
    });
    expect(triggerButton).toBeInTheDocument();
  });

  it('opens the menu on mouse enter and closes on mouse leave', () => {
    setup();

    // Simulate mouse enter on button
    const triggerButton = screen.getByRole('button', {
      name: /find jokes by category/i,
    });
    fireEvent.mouseEnter(triggerButton);

    // Menu should be visible
    const menu = screen.getByRole('menu', { name: /category menu/i });
    expect(menu).toBeVisible();

    // Simulate mouse leave
    fireEvent.mouseLeave(menu);

    // Menu is no longer visible
    expect(menu).not.toBeVisible();
  });

  it('calls onCategoryClick when a category is clicked', () => {
    setup();

    // Open the menu
    const triggerButton = screen.getByRole('button', {
      name: /find jokes by category/i,
    });
    fireEvent.mouseEnter(triggerButton);

    // Click on a category
    const categoryItem = screen.getByText('Category 1');
    fireEvent.click(categoryItem);

    expect(mockOnCategoryClick).toHaveBeenCalledWith('Category 1');
    expect(mockOnCategoryClick).toHaveBeenCalledTimes(1);
  });

  it('calls onRandomJokeClick when the random joke button is clicked', () => {
    setup();

    // Open the menu
    const triggerButton = screen.getByRole('button', {
      name: /find jokes by category/i,
    });
    fireEvent.mouseEnter(triggerButton);

    // Click the random joke button
    const randomJokeButton = screen.getByRole('button', {
      name: /get a random joke/i,
    });
    fireEvent.click(randomJokeButton);

    expect(mockOnRandomJokeClick).toHaveBeenCalledTimes(1);
  });

  it('renders all categories correctly', () => {
    setup();

    // Open the menu
    const triggerButton = screen.getByRole('button', {
      name: /find jokes by category/i,
    });
    fireEvent.mouseEnter(triggerButton);

    // Check all categories are rendered
    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });
});
