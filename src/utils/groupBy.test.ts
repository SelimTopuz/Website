import { describe, expect, it } from "vitest";
import { groupBy } from "./groupBy";

describe("groupBy", () => {
  it("groups items by key function", () => {
    const items = [
      { name: "React", category: "Frontend" },
      { name: "Node", category: "Backend" },
      { name: "Vue", category: "Frontend" },
    ];

    const grouped = groupBy(items, (item) => item.category);

    expect(grouped.Frontend).toHaveLength(2);
    expect(grouped.Backend).toHaveLength(1);
    expect(grouped.Frontend?.[0]?.name).toBe("React");
  });

  it("returns empty object for empty input", () => {
    expect(groupBy([], () => "key")).toEqual({});
  });
});
