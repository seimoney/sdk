import type { HttpClient } from "../core/http-client";
import type { Activity, Analytics } from "../types";

export class AnalyticsModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get all activities for the authenticated user
   */
  async getActivities(): Promise<Activity[]> {
    return await this.httpClient.get<Activity[]>("/activities");
  }

  /**
   * Get analytics dashboard data
   */
  async getAnalytics(): Promise<Analytics> {
    return await this.httpClient.get<Analytics>("/analytics");
  }

  /**
   * Get activities for a specific item (payment link, file, or contract)
   */
  async getActivitiesFor(id: string): Promise<Activity[]> {
    return await this.httpClient.get<Activity[]>(`/activities/${id}`);
  }
}