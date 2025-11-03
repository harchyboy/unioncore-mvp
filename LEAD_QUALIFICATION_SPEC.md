# FR-002: Lead Qualification & Scoring - Technical Specification

## BANT Scoring System

### Budget (0-25 points)

| Budget Range     | Points | Grade Impact |
| ---------------- | ------ | ------------ |
| £100k+ annual    | 25     | A            |
| £50k-£99k annual | 20     | B            |
| £25k-£49k annual | 15     | C            |
| £10k-£24k annual | 10     | D            |
| Under £10k       | 5      | D            |
| Unknown          | 0      | Unqualified  |

### Authority (0-25 points)

| Authority Level         | Points | Grade Impact |
| ----------------------- | ------ | ------------ |
| C-Level / Owner         | 25     | A            |
| VP / Director           | 20     | B            |
| Manager                 | 15     | C            |
| Coordinator / Assistant | 10     | D            |
| Individual Contributor  | 5      | D            |
| Unknown                 | 0      | Unqualified  |

### Need (0-25 points)

| Need Urgency          | Points | Grade Impact |
| --------------------- | ------ | ------------ |
| Critical - Immediate  | 25     | A            |
| High - Within 1 month | 20     | B            |
| Medium - 1-3 months   | 15     | C            |
| Low - 3-6 months      | 10     | D            |
| Exploring - 6+ months | 5      | D            |
| Unknown               | 0      | Unqualified  |

### Timeline (0-25 points)

| Timeline                 | Points | Grade Impact |
| ------------------------ | ------ | ------------ |
| Immediate (< 2 weeks)    | 25     | A            |
| Short-term (2-4 weeks)   | 20     | B            |
| Medium-term (1-3 months) | 15     | C            |
| Long-term (3-6 months)   | 10     | D            |
| Future (6+ months)       | 5      | D            |
| Unknown                  | 0      | Unqualified  |

## Overall Grading System

| Grade | Total Score | Description                                               | Action Priority                 |
| ----- | ----------- | --------------------------------------------------------- | ------------------------------- |
| A     | 85-100      | Hot Lead - High budget, decision maker, urgent need       | Immediate contact within 1 hour |
| B     | 70-84       | Warm Lead - Good budget, some authority, near-term need   | Contact within 24 hours         |
| C     | 50-69       | Cool Lead - Moderate budget, limited authority, exploring | Contact within 3 days           |
| D     | 25-49       | Cold Lead - Low budget, no authority, distant timeline    | Nurture campaign                |
| U     | 0-24        | Unqualified - Insufficient information or not a fit       | Request more info or disqualify |

## Additional Scoring Factors (Bonus Points)

### Property Fit (+0 to +10)

- Perfect match available: +10
- Good alternatives available: +5
- Limited options: +2
- No suitable properties: -5

### Source Quality (+0 to +5)

- Broker referral: +5
- Existing client referral: +5
- Website direct: +3
- Inbound call: +2
- Cold outreach: +0

### Company Profile (+0 to +5)

- Recognized brand: +5
- Growing company: +3
- Startup: +2
- Individual: +0

## Implementation Notes

- Total possible score: 100 (BANT) + 20 (bonuses) = 120
- Grading based on BANT score (0-100)
- Bonus points can push leads into higher grades
- Auto-disqualification if any BANT = 0 (Unknown)
- Re-scoring triggered on any data update
