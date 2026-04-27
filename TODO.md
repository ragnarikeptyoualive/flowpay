# Task: Update Rules & Restrictions

## Goal
Replace the two rules:
- "One account per buyer unless approved"
- "Escrow fees are non-refundable"

With a single new rule in all 9 languages:
- "No data leak or ID asked, and we keep as minimal data as possible for a better use of app later on"

## Files to Edit
1. `lib/translations.ts` — update `HowTranslations` interface (remove `r5`) and all 9 language objects
2. `components/HomeClient.tsx` — update `how.rules.items` arrays in all 9 language objects

## Steps
- [ ] Update TODO.md (this file)
- [ ] Edit `lib/translations.ts`
- [ ] Edit `components/HomeClient.tsx`
- [ ] Verify no broken references remain

