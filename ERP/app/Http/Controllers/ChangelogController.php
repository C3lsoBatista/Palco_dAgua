<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Process\Process;

class ChangelogController extends Controller
{
    public function index()
    {
        // O git está na raiz do projeto (um nível acima do /ERP)
        $gitPath = realpath(base_path('..'));

        // Usar array de argumentos evita problemas com aspas no Windows
        $process = new Process(
            [
                'git', 'log', '-n', '30',
                '--pretty=format:%h|||%an|||%ad|||%s|||%b^^^',
                '--date=iso',
            ],
            $gitPath
        );

        $process->run();

        $commits = [];

        if ($process->isSuccessful()) {
            $output = $process->getOutput();
            $rawCommits = array_filter(explode('^^^', $output));

            foreach ($rawCommits as $raw) {
                $raw = trim($raw);
                if (empty($raw)) continue;

                $parts = explode('|||', $raw);
                if (count($parts) < 4) continue;

                $commits[] = [
                    'hash'    => trim($parts[0] ?? ''),
                    'author'  => trim($parts[1] ?? ''),
                    'date'    => trim($parts[2] ?? ''),
                    'title'   => trim($parts[3] ?? ''),
                    'content' => trim($parts[4] ?? ''),
                    'label'   => $this->getBadgeForTitle(trim($parts[3] ?? '')),
                ];
            }
        }

        return Inertia::render('Changelog/Index', [
            'commits' => $commits,
        ]);
    }

    /**
     * Define uma label/badge baseada no prefixo do commit.
     */
    private function getBadgeForTitle(string $title): string
    {
        $lower = strtolower($title);

        if (str_contains($lower, 'fix') || str_contains($lower, 'bug')) {
            return 'Bug Fix';
        }
        if (str_contains($lower, 'feat') || str_contains($lower, 'add') || str_contains($lower, 'new')) {
            return 'Product';
        }
        if (str_contains($lower, 'announce') || str_contains($lower, 'release')) {
            return 'Announcement';
        }

        return 'Update';
    }
}
