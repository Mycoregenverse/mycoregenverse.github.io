/**
 * Archive project detail bodies.
 *
 * The index rows (name / domain / status / short description) live in the i18n
 * dictionaries under `archive.projects`. This module holds the long-form
 * material for the projects the practice has written up — a standfirst
 * `tagline` and a Markdown `body`, per language. A project without an entry
 * here still appears in the index; its detail route shows the "in preparation"
 * state until its text arrives.
 *
 * Raw texts are cleaned, not rewritten: working notes stripped, bare section
 * titles promoted to `##` / `###`, sub-term labels bolded, `[[P0N-Name]]`
 * wiki-links normalized to `[[slug|Label]]`, bullet lists kept. The proposal's
 * meaning is left intact.
 */

export { slugify } from '../slugify';

export interface ArchiveDetail {
  tagline: { pt: string; en: string };
  body: { pt: string; en: string };
}

import { sporeNetwork } from './spore-network';
import { axiaFund } from './axia-fund';
import { atlasResearchGroup } from './atlas-research-group';
import { blueHorizonProperties } from './blue-horizon-properties';
import { rootworkCollective } from './rootwork-collective';
import { theHyphaeReport } from './the-hyphae-report';
import { bioregionalCapitalFramework } from './bioregional-capital-framework';
import { substrateProtocol } from './substrate-protocol';

export const ARCHIVE_DETAILS: Record<string, ArchiveDetail> = {
  'spore-network': sporeNetwork,
  'axia-fund': axiaFund,
  'atlas-research-group': atlasResearchGroup,
  'blue-horizon-properties': blueHorizonProperties,
  'rootwork-collective': rootworkCollective,
  'the-hyphae-report': theHyphaeReport,
  'bioregional-capital-framework': bioregionalCapitalFramework,
  'substrate-protocol': substrateProtocol,
};

export function archiveDetail(slug: string): ArchiveDetail | undefined {
  return ARCHIVE_DETAILS[slug];
}
