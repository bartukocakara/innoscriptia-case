<?php

namespace App\Filters;
use Illuminate\Support\Str;

class FilterBuilder
{
    protected $query;
    protected $filters;
    protected $namespace;
    public $defaultPerPage = 10;
    public $defaultSortField = 'created_at';
    public $defaultSortOrder = 'desc';

    public function __construct($query, $filters, $namespace)
    {
        $this->query = $query;
        $this->filters = $filters;
        $this->namespace = $namespace;
    }

    public function apply()
    {
        foreach ($this->filters as $name => $value) {
            $class = "App\Filters\\".$this->namespace."\\".ucfirst(Str::camel($name));
            if (! class_exists($class)) {
                continue;
            }
            if (is_string($value) && strlen($value)) {
                (new $class($this->query))->handle( $this->sanitizeInput($value));
            } elseif(is_array($value)) {
                (new $class($this->query))->handle($value);
            }
        }

        return !empty($this->filters['per_page']) ? $this->paginating($this->query, $this->filters) : $this->query->get();
    }

    protected function paginating($query, $filters)
    {
        $searchArray['order_by'] = array_key_exists('order_by', $filters) ? $filters['order_by'] : $this->defaultSortField;
        $searchArray['order_sort'] = array_key_exists('order_sort', $filters) ? $filters['order_sort'] : $this->defaultSortOrder;
        $searchArray['per_page'] = array_key_exists('per_page', $filters) ? $filters['per_page'] : $this->defaultPerPage;
        return $query->orderBy($searchArray['order_by'], $searchArray['order_sort'])
                        ->paginate($searchArray["per_page"]);

    }

    /**
     * Sanitizes user input to prevent SQL injection attacks
     *
     * @param string $input The user input to sanitize
     * @return string The sanitized input
     */
    protected function sanitizeInput(string $input): string
    {
        // Remove any potentially harmful characters
        $input = preg_replace("/[^\w\s\-]/", "", $input);

        // Escape special characters that could interfere with database queries
        $input = str_replace(array("'", "\"", "\\", "\0"), array("''", "", "\\\\", ""), $input);

        return $input;
    }
}
