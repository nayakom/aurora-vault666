/**
 * Utility to smartly parse specifications copied from e-commerce sites
 * (Flipkart, Myntra, Amazon, spreadsheets, or raw text) into { key, value }[] pairs.
 */

export interface SpecificationItem {
  key: string;
  value: string;
}

const COMMON_IGNORE_HEADERS = new Set([
  'general',
  'specifications',
  'specification',
  'product details',
  'details',
  'more details',
  'dimensions',
  'body features',
  'in the box',
  'highlights',
  'additional features',
  'overview'
]);

const KNOWN_SPEC_LABELS = [
  'Brand',
  'Watch Type',
  'Display Type',
  'Ideal For',
  'Water Resistant',
  'Mechanism',
  'Style Code',
  'Series',
  'Occasion',
  'Movement',
  'Pack of',
  'Sales Package',
  'Model Name',
  'Model Number',
  'Dial Color',
  'Strap Color',
  'Strap Material',
  'Case Material',
  'Warranty',
  'Warranty Summary',
  'Covered in Warranty',
  'Not Covered in Warranty',
  'Sleeve Length',
  'Sleeve Styling',
  'Neck',
  'Pattern',
  'Hemline',
  'Fabric',
  'Fit',
  'Length',
  'Weave Pattern',
  'Wash Care',
  'Net Quantity',
  'Country of Origin',
  'Manufacturer',
  'Size & Fit',
  'Material & Care',
  'Color',
  'Type',
  'Closure',
  'Transparency',
  'Surface Styling',
  'Shape',
  'Gender',
  'Power Source',
  'Battery Type',
  'Strap Type',
  'Clasp Type'
];

export function parseBulkSpecifications(rawText: string): SpecificationItem[] {
  if (!rawText || !rawText.trim()) return [];

  const text = rawText.trim();
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  const results: SpecificationItem[] = [];

  // Check if lines have tab delimiters (e.g. copied from table or excel)
  const hasTabs = lines.some((l) => l.includes('\t'));

  // Check if multiple lines have colons (e.g. "Brand: Daniel Klein")
  const colonLines = lines.filter((l) => {
    const parts = l.split(':');
    return parts.length >= 2 && parts[0].trim().length > 0 && parts[1].trim().length > 0;
  });
  const hasColons = colonLines.length >= Math.max(1, Math.floor(lines.length * 0.3));

  if (hasTabs) {
    for (const line of lines) {
      const parts = line.split('\t').map((s) => s.trim()).filter(Boolean);
      if (parts.length >= 2) {
        results.push({ key: parts[0], value: parts.slice(1).join(' ') });
      } else if (parts.length === 1 && !COMMON_IGNORE_HEADERS.has(parts[0].toLowerCase())) {
        results.push({ key: parts[0], value: '' });
      }
    }
  } else if (hasColons) {
    for (const line of lines) {
      if (line.includes(':')) {
        const [k, ...v] = line.split(':');
        const key = k.trim();
        const val = v.join(':').trim();
        if (key && !COMMON_IGNORE_HEADERS.has(key.toLowerCase())) {
          results.push({ key, value: val });
        }
      } else if (!COMMON_IGNORE_HEADERS.has(line.toLowerCase())) {
        results.push({ key: line, value: '' });
      }
    }
  } else if (lines.length > 1) {
    // Alternating lines (Flipkart / Myntra web copy format):
    // Line 1: Key, Line 2: Value
    let i = 0;
    while (i < lines.length) {
      const current = lines[i];
      const lower = current.toLowerCase();

      // Skip section headers like "General" or "Specifications"
      if (COMMON_IGNORE_HEADERS.has(lower)) {
        i++;
        continue;
      }

      // Check if line itself contains a colon
      if (current.includes(':')) {
        const [k, ...v] = current.split(':');
        const key = k.trim();
        const val = v.join(':').trim();
        if (key) results.push({ key, value: val });
        i++;
        continue;
      }

      if (i + 1 < lines.length) {
        const next = lines[i + 1];
        const nextLower = next.toLowerCase();

        // If next line is a section header, treat current line as solo key
        if (COMMON_IGNORE_HEADERS.has(nextLower)) {
          results.push({ key: current, value: '' });
          i++;
          continue;
        }

        // Standard alternating: Key, then Value
        results.push({ key: current, value: next });
        i += 2;
      } else {
        // Last line without a pair
        results.push({ key: current, value: '' });
        i++;
      }
    }
  } else {
    // Single line - check for run-on text containing known labels
    const singleText = lines[0];
    const regex = new RegExp(
      '\\b(' + KNOWN_SPEC_LABELS.map((k) => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|') + ')\\b',
      'gi'
    );
    const matches: { key: string; index: number; end: number }[] = [];
    let m: RegExpExecArray | null;

    while ((m = regex.exec(singleText)) !== null) {
      matches.push({ key: m[0], index: m.index, end: m.index + m[0].length });
    }

    if (matches.length > 1) {
      // If there was text before the first match, that can be description or product details
      if (matches[0].index > 0) {
        const leadText = singleText.substring(0, matches[0].index).trim();
        if (leadText && leadText.length > 3) {
          results.push({ key: 'Product Details', value: leadText });
        }
      }

      for (let j = 0; j < matches.length; j++) {
        const currentM = matches[j];
        const nextStart = j + 1 < matches.length ? matches[j + 1].index : singleText.length;
        let val = singleText.substring(currentM.end, nextStart).trim().replace(/^[:\-\s]+/, '');
        val = val.replace(/\s*(Specifications|Specification|General|Product Details|Details)$/i, '').trim();
        if (!COMMON_IGNORE_HEADERS.has(currentM.key.toLowerCase())) {
          results.push({ key: currentM.key, value: val });
        }
      }
    } else {
      // Check if it has a colon
      if (singleText.includes(':')) {
        const [k, ...v] = singleText.split(':');
        results.push({ key: k.trim(), value: v.join(':').trim() });
      } else {
        results.push({ key: 'Product Details', value: singleText });
      }
    }
  }

  // Filter out empty keys and clean up formatting
  const filtered = results
    .map((r) => ({ key: r.key.trim(), value: r.value.trim() }))
    .filter((r) => r.key.length > 0 && !COMMON_IGNORE_HEADERS.has(r.key.toLowerCase()));

  return filtered.length > 0 ? filtered : [{ key: '', value: '' }];
}
