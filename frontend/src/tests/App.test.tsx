import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { GetSettingsDocument, RefreshAuthDocument } from '../gql/graphql.tsx';
import { mockedUser } from './__mocks__/mocks.ts';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App.tsx';

describe('App tests', () => {
  it('calls refresh settings', async () => {
    let isRefreshMockCaled = false;
    const getSettingsMock = {
      request: {
        query: GetSettingsDocument
      },
      result: () => {
        return {
          data: {}
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
          data: {}
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
});
