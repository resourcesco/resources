import { AppSpec } from '../../app-base/App'
import { ok } from '../../app-base/request'
import camelCase from '../../app-base/util/string/camelCase'

const actions = {
  auth: {
    auth({ env, params: { apiToken } }) {
      env.ASANA_TOKEN = apiToken
      return 'API key saved to session.'
    },
    authClear({ env }) {
      delete env.ASANA_TOKEN
      return 'API key cleared.'
    },
  },
  workspaces: {
    async get({ env: { ASANA_TOKEN: apiToken }, request }) {
      const req = {
        url: 'https://app.asana.com/api/1.0/workspaces',
        method: 'GET',
        headers: { Authorization: `Bearer ${apiToken}` },
      }
      const response = await request(req)
      if (ok(response)) {
        return {
          type: 'tree',
          name: 'request',
          value: { ...req, response },
          state: {
            _showOnly: ['response', 'body', 'data'],
          },
          rules: {
            workspace: {
              selector: '/response/body/data/:index',
              summary: [
                {
                  type: 'node',
                  path: ['name'],
                  showLabel: false,
                },
                {
                  type: 'action',
                  name: 'projects',
                  params: { id: '0/gid' },
                  url: '/asana/workspaces/:id/projects',
                  action: 'get',
                },
              ],
            },
          },
        }
      } else {
        return { type: 'text', text: `Error getting task` }
      }
    },
  },
  projects: {
    async get({
      env: { ASANA_TOKEN: apiToken },
      params: { workspace },
      request,
    }) {
      const req = {
        url: `https://app.asana.com/api/1.0/workspaces/${workspace}/projects`,
        method: 'GET',
        headers: { Authorization: `Bearer ${apiToken}` },
      }
      const response = await request(req)
      if (ok(response)) {
        return {
          type: 'tree',
          name: 'request',
          value: { ...req, response },
          state: {
            _showOnly: ['response', 'body', 'data'],
          },
          rules: {
            workspace: {
              selector: '/response/body/data/:index',
              summary: [
                {
                  type: 'node',
                  path: ['name'],
                  showLabel: false,
                },
                {
                  type: 'action',
                  name: 'tasks',
                  params: { id: '0/gid' },
                  url: '/asana/projects/:id/tasks',
                  action: 'get',
                },
                {
                  type: 'action',
                  name: 'sections',
                  params: { id: '0/gid' },
                  url: '/asana/projects/:id/sections',
                  action: 'get',
                },
              ],
            },
          },
        }
      } else {
        return { type: 'text', text: `Error getting task` }
      }
    },
  },
  projectTasks: {
    async get({
      env: { ASANA_TOKEN: apiToken },
      params: { project },
      request,
    }) {
      const req = {
        url: `https://app.asana.com/api/1.0/tasks?project=${project}&opt_expand=projects.gid&completed_since=now`,
        method: 'GET',
        headers: { Authorization: `Bearer ${apiToken}` },
      }
      const response = await request(req)
      if (ok(response)) {
        return {
          type: 'tree',
          name: 'request',
          value: { ...req, response },
          state: {
            _showOnly: ['response', 'body', 'data'],
          },
          rules: {
            workspace: {
              selector: '/response/body/data/:index',
              summary: [
                {
                  type: 'node',
                  path: ['name'],
                  showLabel: false,
                },
                {
                  type: 'action',
                  name: 'comment',
                  params: { id: '0/gid' },
                  url: '/asana/tasks/:id',
                  action: 'comment',
                },
                {
                  type: 'action',
                  name: 'complete',
                  params: { id: '0/gid' },
                  url: '/asana/tasks/:id',
                  action: 'complete',
                },
              ],
            },
          },
        }
      } else {
        return { type: 'text', text: `Error getting task` }
      }
    },
  },
  sectionTasks: {
    async get({
      env: { ASANA_TOKEN: apiToken },
      params: { section },
      request,
    }) {
      const req = {
        url: `https://app.asana.com/api/1.0/tasks?section=${section}&opt_expand=memberships&completed_since=now&opt_fields=name,resource_type,completed`,
        method: 'GET',
        headers: { Authorization: `Bearer ${apiToken}` },
      }
      const response = await request(req)
      if (ok(response)) {
        return {
          type: 'tree',
          name: 'request',
          value: { ...req, response },
          state: {
            _showOnly: ['response', 'body', 'data'],
          },
          rules: {
            workspace: {
              selector: '/response/body/data/:index',
              summary: [
                {
                  type: 'node',
                  path: ['name'],
                  showLabel: false,
                },
                {
                  type: 'node',
                  path: ['completed'],
                },
                {
                  type: 'action',
                  name: 'comment',
                  params: { id: '0/gid' },
                  url: '/asana/tasks/:id',
                  action: 'comment',
                },
                {
                  type: 'action',
                  name: 'complete',
                  params: { id: '0/gid' },
                  url: '/asana/tasks/:id',
                  action: 'complete',
                },
              ],
            },
          },
        }
      } else {
        return { type: 'text', text: `Error getting task` }
      }
    },
  },
  sections: {
    async get({
      env: { ASANA_TOKEN: apiToken },
      params: { project },
      request,
    }) {
      const req = {
        url: `https://app.asana.com/api/1.0/projects/${project}/sections`,
        method: 'GET',
        headers: { Authorization: `Bearer ${apiToken}` },
      }
      const response = await request(req)
      if (ok(response)) {
        return {
          type: 'tree',
          name: 'request',
          value: { ...req, response },
          state: {
            _showOnly: ['response', 'body', 'data'],
          },
          rules: {
            workspace: {
              selector: '/response/body/data/:index',
              summary: [
                {
                  type: 'node',
                  path: ['name'],
                  showLabel: false,
                },
                {
                  type: 'action',
                  name: 'tasks',
                  params: { id: '0/gid' },
                  url: '/asana/sections/:id/tasks',
                  action: 'get',
                },
              ],
            },
          },
        }
      } else {
        return { type: 'text', text: `Error getting task` }
      }
    },
  },
  task: {
    async get({ env: { ASANA_TOKEN: apiToken }, params: { id }, request }) {
      const req = {
        url: `https://app.asana.com/api/1.0/tasks/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${apiToken}` },
      }
      const response = await request(req)
      if (ok(response)) {
        return {
          type: 'tree',
          name: 'request',
          value: { ...req, response },
          state: { _showOnly: ['response', 'body', 'data'] },
        }
      } else {
        return { type: 'text', text: `Error getting task` }
      }
    },
    async complete({
      env: { ASANA_TOKEN: apiToken },
      params: { id },
      request,
    }) {
      const response = await request({
        url: `https://app.asana.com/api/1.0/tasks/${id}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${apiToken}` },
        body: { data: { completed: true } },
      })
      if (ok(response)) {
        return { type: 'text', text: `Task marked complete` }
      } else {
        return { type: 'text', text: `Error marking task complete` }
      }
    },
    async comment({
      env: { ASANA_TOKEN: apiToken },
      params: { id, comment },
      request,
    }) {
      const response = await request({
        headers: { Authorization: `Bearer ${apiToken}` },
        url: `https://app.asana.com/api/1.0/tasks/${id}/stories`,
        method: 'POST',
        body: { data: { text: comment } },
      })
      if (ok(response)) {
        return { type: 'text', text: 'Comment added.' }
      } else {
        return { type: 'text', text: 'Error adding comment.' }
      }
    },
  },
}

async function run({ resourceType, action, env, params, request }) {
  if (!['auth', 'auth-clear'].includes(action) && !env.ASANA_TOKEN) {
    return { type: 'error', text: 'An Asana token is required.' }
  }
  const handler = actions[resourceType][camelCase(action)]
  return await handler({ env, params, request })
}

export default async function app(): Promise<AppSpec> {
  return {
    name: 'Asana',
    environmentVariables: {
      ASANA_TOKEN: {
        doc: `
          An Asana personal access token, from the
          [Asana developer console](https://app.asana.com/0/developer-console)'
        `,
      },
    },
    description: 'Manage tasks on Asana',
    resourceTypes: {
      workspaces: {
        routes: [{ path: '/asana/workspaces' }],
        actions: {
          get: {
            params: [],
            request: {
              method: 'GET',
              url: 'https://app.asana.com/api/1.0/workspaces',
            },
          },
        },
      },
      projects: {
        routes: [{ path: '/asana/workspaces/:workspace/projects' }],
        actions: {
          get: {
            params: [],
          },
        },
      },
      projectTasks: {
        routes: [{ path: '/asana/projects/:project/tasks' }],
        actions: {
          get: {
            params: [],
          },
        },
      },
      sections: {
        routes: [{ path: '/asana/projects/:project/sections' }],
        actions: {
          get: {
            params: [],
          },
        },
      },
      sectionTasks: {
        routes: [{ path: '/asana/sections/:section/tasks' }],
        actions: {
          get: {
            params: [],
          },
        },
      },
      task: {
        routes: [
          {
            host: 'app.asana.com',
            path: '/0/:projectId/:id{/f}?',
          },
          { path: '/asana/tasks/:id' },
        ],
        actions: {
          get: {
            params: [],
            request: {
              method: 'GET',
              url: '/tasks/:id',
            },
            docUrl: 'https://developers.asana.com/docs/get-a-task',
          },
          comment: {
            params: ['comment'],
          },
          complete: {
            params: [],
          },
        },
      },
      auth: {
        routes: [
          {
            host: 'app.asana.com',
            path: '/:any*',
          },
          { path: '/asana' },
        ],
        actions: {
          auth: { params: ['apiToken'] },
          'auth-clear': {
            params: [],
          },
        },
      },
    },
    run,
  }
}
