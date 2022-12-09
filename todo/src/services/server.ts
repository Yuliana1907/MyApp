import { Server } from 'miragejs'
import assigners from './data/assigners.json'
import statuses from './data/statuses.json'
import tasks from './data/tableData.json'
import { generateName, generateString } from 'src/contsnts/utils'

export function makeServer({ environment = 'development' } = {}) {
  const server = new Server({
    environment,
    routes() {
      this.get('/api/statuses', () => {
        return statuses
      })
      this.get('/api/assigners', () => {
        return assigners
      })
      this.get('/api/tasks', (schema, request) => {
        const {
          assigned_type,
          search,
          statuses_type,
          created_date,
          last_modified,
          limit,
          offset,
          ordering,
          field
        } = request.queryParams

        const tasksList = schema.db.tasks
          .filter((i) =>
            [
              assigned_type ? assigned_type === i.assigned_type : true,
              statuses_type ? statuses_type === i.statuses_type : true,
              last_modified && created_date
                ? i.created_date >= created_date && i.last_modified <= last_modified
                : true,
              search ? i.task_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true
            ].reduce((prev, curr) => prev && curr)
          )
          .sort(({ [field]: a }, { [field]: b }) =>
            field ? (ordering === 'asc' ? a.localeCompare(b) : b.localeCompare(a)) : 0
          )
          .slice(+offset, +limit + +offset)

        return { ...schema.db.tasks, count: schema.db.tasks.length, results: tasksList }
      })
      this.post('/api/login', () => {
        const token = generateString()
        const email = generateName()
        return { email, token }
      })
      this.post('/api/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        return {
          ...schema.db.tasks,
          count: schema.db.tasks.length,
          results: schema.db.tasks.insert(attrs)
        }
      })
      this.put('/api/tasks/:id', (schema, request) => {
        const id = request.params.id
        const attrs = JSON.parse(request.requestBody)
        return {
          ...schema.db.tasks,
          count: schema.db.tasks.length,
          results: schema.db.tasks.update(id, attrs)
        }
      })
      this.del('/api/tasks', (schema, request) => {
        const attrs = request.queryParams.id
        return {
          ...schema.db.tasks,
          count: schema.db.tasks.length,
          results: schema.db.tasks.remove(attrs)
        }
      })
    }
  })
  server.db.loadData({ tasks })
  return server
}
