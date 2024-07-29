<?php

namespace App\Enums;

enum StatusEnum: int
{
    case UNPUBLISHED = 0;
    case PENDING = 1;
    case PUBLISHED = 2;

    public function label(): string
    {
        return match ($this) {
            self::UNPUBLISHED => 'Unpublished',
            self::PENDING => 'Pending',
            self::PUBLISHED => 'Published',
        };
    }
}
