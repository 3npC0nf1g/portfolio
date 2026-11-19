/** Pastel card backgrounds, used in rotation. Text on all of them is ink. */
export const pastels = ["bg-sun", "bg-mint", "bg-peach", "bg-sky", "bg-lilac"] as const;

export const pastel = (i: number) => pastels[i % pastels.length];
