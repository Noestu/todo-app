import { PagesRouteMatch } from '../route-matches/pages-route-match'
import { RouteHandler } from './route-handler'

export class PagesRouteHandler implements RouteHandler<PagesRouteMatch> {
  public async handle(): Promise<Response> {
    throw new Error('Method not implemented.')
  }
}
