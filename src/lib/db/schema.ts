import {pgTable, timestamp, uuid, text, unique} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    name: text("name").notNull().unique(),
})

export type UserRecord = typeof users.$inferSelect;

export const feeds = pgTable("feeds", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    name: text("name").notNull(),
    url: text("url").notNull().unique(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lastFetchedAt: timestamp("last_fetched_at"),
})

export type FeedRecord = typeof feeds.$inferSelect;

export const feed_follows = pgTable("feed_follows", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
    feedId: uuid("feed_id").notNull().references(() => feeds.id, {onDelete: "cascade"}),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (t) => [
    unique().on(t.userId, t.feedId),
]);

export type FeedFollowRecord = typeof feed_follows.$inferSelect;

export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    title: text("title"),
    url: text("url").notNull().unique(),
    description: text("description"),
    publishedAt: timestamp("published_at"),
    feedId: uuid("feed_id").notNull().references(() => feeds.id, {onDelete: "cascade"}),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export type PostRecord = typeof posts.$inferSelect;
export type NewPostRecord = typeof posts.$inferInsert;
