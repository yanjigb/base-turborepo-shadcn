import { and, eq } from "drizzle-orm";
import { db } from "../index";
import { newsletters } from "../schema";

// Type function declaration
type SaveNewsletterSubscription = (email: string) => Promise<boolean>;

/**
 * This function inserts an email record into our database using Drizzle ORM.
 *
 * @param email - The email to save
 * @returns {Promise<boolean>} - Returns true if a new record was inserted, false otherwise.
 */
export const saveNewsletterSubscription: SaveNewsletterSubscription = async (
  email
): Promise<boolean> => {
  const result = await db
    .insert(newsletters)
    .values({ email })
    .onConflictDoNothing()
    .returning(); // Works well with PostgreSQL

  return result.length > 0; // True if a new record was inserted
};

export const databaseAliveTest = async () => {
  const email = "temp1234@email.com";
  const result = await db
    .insert(newsletters)
    .values({ email })
    .onConflictDoNothing()
    .returning(); // Works well with PostgreSQL
  if (!(result.length > 0 && result[0])) return false;
  await db
    .delete(newsletters)
    .where(and(eq(newsletters.email, email), eq(newsletters.id, result[0].id)));
  return true;
};
