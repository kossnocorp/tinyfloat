test:
	pnpm exec vitest run

test-watch:
	pnpm exec vitest run --watch

test-types: install-attw build 
	@cd lib && attw --pack

.PHONY: build
build:
	@rm -rf lib
	@env BABEL_ENV=esm npx babel src --source-root src --out-dir lib --extensions .ts --out-file-extension .mjs --ignore "src/**/tests.ts" --quiet
	@env BABEL_ENV=cjs npx babel src --source-root src --out-dir lib --extensions .ts --out-file-extension .js --ignore "src/**/tests.ts" --quiet
	@npx tsc --project tsconfig.lib.json
	@make build-mts
	@cp package.json lib
	@cp *.md lib

build-mts:
	@find lib -name '*.d.ts' | while read file; do \
		new_file=$${file%.d.ts}.d.mts; \
		cp $$file $$new_file; \
	done

publish: build
	@cd lib && npm publish --access public

publish-next: build
	@cd lib && npm publish --access public --tag next

install-attw:
	@if ! command -v attw >/dev/null 2>&1; then \
		npm i -g @arethetypeswrong/cli; \
	fi