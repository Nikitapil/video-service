import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GetFavoriteUserPostsDocument, GetUserProfileDocument } from '../gql/graphql.tsx';
import { mockedPost, mockedUserProfile } from './__mocks__/mocks.ts';
import Profile from '../modules/profile/pages/Profile.tsx';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getMockedObject } from './__mocks__/utils.ts';

describe('Profile tests', () => {
  const mockGetUserProfile = (mock = mockedUserProfile) => ({
    request: {
      query: GetUserProfileDocument,
      variables: { userId: 1 }
    },
    result: {
      data: { getUserProfile: mock }
    }
  });

  it('renders loading state', () => {
    render(
      <MockedProvider mocks={[mockGetUserProfile()]}>
        <MemoryRouter initialEntries={['/profile/1']}>
          <Routes>
            <Route
              path="/profile/:id"
              element={<Profile />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId('loading-profile')).toBeInTheDocument();
  });

  it('renders not found state', async () => {
    render(
      <MockedProvider mocks={[mockGetUserProfile()]}>
        <MemoryRouter initialEntries={['/profile/2']}>
          <Routes>
            <Route
              path="/profile/:id"
              element={<Profile />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('not-found')).toBeInTheDocument());
  });

  it('renders profile', async () => {
    render(
      <MockedProvider mocks={[mockGetUserProfile()]}>
        <MemoryRouter initialEntries={['/profile/1']}>
          <Routes>
            <Route
              path="/profile/:id"
              element={<Profile />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('profile-page')).toBeInTheDocument());
  });

  it('show favorites posts', async () => {
    const mockGetFavoriteUserPosts = {
      request: {
        query: GetFavoriteUserPostsDocument,
        variables: { userId: 1 }
      },
      result: {
        data: { getFavoriteUserPosts: [mockedPost, mockedPost] }
      }
    };
    render(
      <MockedProvider mocks={[mockGetUserProfile(), mockGetFavoriteUserPosts]}>
        <MemoryRouter initialEntries={['/profile/1']}>
          <Routes>
            <Route
              path="/profile/:id"
              element={<Profile />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => fireEvent.click(screen.getAllByTestId('tab')[1]));

    await waitFor(() => expect(screen.getAllByTestId('post-profile')).toHaveLength(2));
  });

  it('show my profile block', async () => {
    render(
      <MockedProvider mocks={[mockGetUserProfile(getMockedObject(mockedUserProfile, { isMyProfile: true }))]}>
        <MemoryRouter initialEntries={['/profile/1']}>
          <Routes>
            <Route
              path="/profile/:id"
              element={<Profile />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('my-profile-block')).toBeInTheDocument());
  });

  it('show send message btn', async () => {
    render(
      <MockedProvider mocks={[mockGetUserProfile(getMockedObject(mockedUserProfile, { canSendMessage: true }))]}>
        <MemoryRouter initialEntries={['/profile/1']}>
          <Routes>
            <Route
              path="/profile/:id"
              element={<Profile />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('send-message-btn')).toBeInTheDocument());
  });
});
