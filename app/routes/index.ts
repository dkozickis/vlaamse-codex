import Route from "@ember/routing/route";
import type { APICallReturnBase } from "codex/types";

const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX eli: <http://data.europa.eu/eli/ontology#>

SELECT ?date, ?title WHERE {
  ?doc
    eli:type_document
      <https://data.vlaanderen.be/id/concept/AardWetgeving/Decreet>;
    eli:is_realized_by
      ?verschijningsvorm.
  ?verschijningsvorm
    eli:date_publication
      ?date;
    eli:title
      ?title.
  } ORDER BY DESC(?date) LIMIT 5
`;

export default class IndexRoute extends Route<
  { date: string; title: string }[]
> {
  async model() {
    const url = `https://codex.opendata.api.vlaanderen.be:8888/sparql?query=${encodeURIComponent(
      query
    )}`;

    const response = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
    });

    const {
      results: { bindings },
    } = (await response.json()) as APICallReturnBase<"date" | "title">;

    return bindings.map(({ title, date }) => ({
      date: date.value,
      title: title.value,
    }));
  }
}
