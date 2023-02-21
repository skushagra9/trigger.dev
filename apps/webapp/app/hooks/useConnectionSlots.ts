import type { APIConnection } from ".prisma/client";
import type { IntegrationMetadata } from "@trigger.dev/integration-sdk";
import type { UseDataFunctionReturn } from "remix-typedjson/dist/remix";
import type { loader } from "~/routes/__app/orgs/$organizationSlug/workflows/$workflowSlug";
import { hydrateObject, useMatchesData } from "~/utils";

export type ConnectionSlot = {
  id: string;
  connection: APIConnection | null;
  integration: IntegrationMetadata;
  possibleConnections: APIConnection[];
};

export function useConnectionSlots() {
  const routeMatch = useMatchesData(
    "routes/__app/orgs/$organizationSlug/workflows/$workflowSlug"
  );

  if (!routeMatch || !routeMatch.data.connectionSlots) {
    return undefined;
  }

  if (routeMatch.data.connectionSlots == null) {
    return undefined;
  }

  const result = hydrateObject<
    UseDataFunctionReturn<typeof loader>["connectionSlots"]
  >(routeMatch.data.connectionSlots);

  if (result == null) return undefined;
  return result;
}
