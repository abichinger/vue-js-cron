#!/usr/bin/env node
import { ArgumentParser } from 'argparse'
import nunjucks from 'nunjucks'
import path from 'path'
import { generateSetups } from './demo.js'
import { generateGuides } from './guide.js'
import { generateReadmes } from './readme.js'
import { __dirname } from './util.js'

const templates = path.resolve(__dirname, 'templates')
nunjucks.configure(templates, { autoescape: true })

const parser = new ArgumentParser({
  description: 'generate code and documentation for all vue-js-cron flavors',
})
const subparsers = parser.add_subparsers({ dest: 'subcommand' })

// Subcommands
const readme = subparsers.add_parser('readme', {
  description: 'generate README.md for each flavor',
})
readme.add_argument('outDir', { type: 'str' })

const demo = subparsers.add_parser('demo-setup', {
  description: 'generate demo setup for each flavor',
})
demo.add_argument('outDir', { type: 'str' })

const guide = subparsers.add_parser('guide', {
  description: 'generate getting started for each flavor',
})
guide.add_argument('outDir', { type: 'str' })

// Parse arguments
const args = parser.parse_args()

if (args.subcommand == 'readme') {
  generateReadmes(args)
} else if (args.subcommand == 'demo-setup') {
  generateSetups(args)
} else if (args.subcommand == 'guide') {
  generateGuides(args)
}
