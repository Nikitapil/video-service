import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { GetSettingsDocument, RefreshAuthDocument } from '../gql/graphql.tsx';
import { mockedUser } from './__mocks__/mocks.ts';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App.tsx';
import { GraphQLError } from 'graphql/error';

describe('App tests', () => {
  it('calls refresh settings', async () => {
    let isRefreshMockCaled = false;
    const getSettingsMock = {
      request: {
        query: GetSettingsDocument
      },
      result: () => {
        return {};
      }
    };

    const refreshMock = {
      request: {
        query: RefreshAuthDocument
      },
      result: () => {
        isRefreshMockCaled = true;
        return {};
      }
    };

    render(
      <MockedProvider mocks={[getSettingsMock, refreshMock]}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(isRefreshMockCaled).toBe(true);
    });
  });

  it('calls get settings', async () => {
    let isGetSettingsMockCaled = false;
    let isRefreshMockCaled = false;
    const getSettingsMock = {
      request: {
        query: GetSettingsDocument
      },
      result: () => {
        isGetSettingsMockCaled = true;
        return {
          data: {
            getSettings: {}
          }
        };
      }
    };

    const refreshMock = {
      request: {
        query: RefreshAuthDocument
      },
      result: () => {
        isRefreshMockCaled = true;
        return {
          data: {
            refreshToken: {
              user: mockedUser
            }
          }
        };
      }
    };

    render(
      <MockedProvider mocks={[getSettingsMock, refreshMock]}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(isRefreshMockCaled).toBe(true);
      expect(isGetSettingsMockCaled).toBe(true);
    });
  });

  it('calls handle error correctly', async () => {
    const spy = vi.spyOn(console, 'error');
    const refreshMock = {
      request: {
        query: RefreshAuthDocument
      },
      result: () => {
        return {
          errors: [
            new GraphQLError('Error', {
              extensions: {
                fullname: '123'
              }
            })
          ]
        };
      }
    };

    render(
      <MockedProvider mocks={[refreshMock]}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
