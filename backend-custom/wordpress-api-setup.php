// Registrar el endpoint en la REST API: /wp-json/goatxi/v1/pools
add_action('rest_api_init', function () {
    register_rest_route('goatxi/v1', '/pools', array(
        'methods'             => 'GET',
        'callback'            => 'get_goatxi_teams_data',
        'permission_callback' => '__return_true', // Acceso público para el frontend
    ));
});

function get_goatxi_teams_data() {
    $args = array(
        'post_type'      => 'equipos',
        'posts_per_page' => -1, // Traemos todos los equipos (los ~500)
        'post_status'    => 'publish'
    );

    $query = new WP_Query($args);
    $formatted_teams = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();

            // Recogemos el string del área de texto
            $raw_json = get_field('players_json', $post_id);
            
            // Lo decodificamos a un array de PHP. Si está vacío o mal formado, devolvemos array vacío
            $players_array = !empty($raw_json) ? json_decode($raw_json, true) : array();
            
            // Si el JSON de WordPress venía mal formateado por error humano, evitamos que rompa
            if (json_last_error() !== JSON_ERROR_NONE) {
                $players_array = array(array("name" => "Error en JSON de este equipo", "pos" => "POR", "ovr" => 0, "active" => "0"));
            }

            // Estructura limpia y masticada para tu React
            $formatted_teams[] = array(
                'id'        => $post_id,
                'team'      => get_field('club_name', $post_id), // Ej: FC Barcelona
                'year'      => (int)get_field('year', $post_id),      // Ej: 2005
                'players'   => $players_array                         // Array de objetos nativos
            );
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($formatted_teams, 200);
}