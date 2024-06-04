import { humanReadableTimestamp } from "./timestamp";
import { describe, it, expect } from "vitest"

describe('humanReadableTimestamp', () => {
    it('renders a timestamp to a human readable string that defaults en-US', () => {
        expect(humanReadableTimestamp(1715173100571, undefined)).to.equal('5/8/2024, 12:58:20 PM');
    });
    it('renders a timestamp to a human readable string an can be configured using a locale', () => {
        expect(humanReadableTimestamp(1715173100571, 'de-DE')).to.equal('8.5.2024, 12:58:20');
    });
});